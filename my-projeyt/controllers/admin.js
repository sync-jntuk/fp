import admin from "../models/admin.js"
import examResult from "../models/examResult.js"
import student from "../models/student.js"
import semesterApplication from "../models/semesterApplication.js"
import sendMail from "../utility_modules/mailHandler.js"
import StudentController from "./student.js"

const studentController = StudentController()

function getHTMLFormat(result) {
    if (!result) {
        throw "No result available"
    }
    result.subjects = Object.entries(result.subjects)
    let body = `
                <p>Roll Number: ${result.roll}</p>
                <p>Year: ${result.year}, Semester: ${result.semester}</p>
                <table>
                    <tr>
                        <th>COURSE CODE</th>
                        <th>COURSE TITLE</th>
                        <th>POINTS</th>
				    </tr>
            `
    for (const subject of result.subjects) {
        body += `
                    <tr>
                        <th>${subject[0]}</th>
                        <td>${subject[1].name}</td>
                        <th>${subject[1].grade}</th>
                    </tr>
                `
    }
    body += `
                </table>
                <p>GPA : ${result.total}</p>
                <p>Credits : ${result.creditSum}</p>
            `
    return body
}

export default function AdminController() {
    return {
        login: async function ({ email, passwd }) {
            try {
                const result = await admin.findOne({ email: email, passwd: passwd })
                delete result.passwd
                return result
            } catch (e) {
                return { errno: 404, ...e }
            }
        },
        uploadResult: async function ({ roll, semester, year, subjects }) {
            let sub = {}
            for (const [k, v] of Object.entries(subjects)) {
                sub[k] = +v
            }
            try {
                const stud = await student.findOne({ roll: roll })
                const examRes = new examResult({
                    roll: roll,
                    semester: semester,
                    year: year,
                    subjects: sub,
                    batch: stud.batch
                })
                const result = await examRes.save()
                return result
            } catch (e) {
                return { errno: 404, ...e }
            }
        },
        uploadSupplyResult: async function ({ roll, semester, year, subjects }) {
            let sub = {}
            for (const [k, v] of Object.entries(subjects)) {
                sub[k] = +v
            }
            try {
                const examRes = await examResult.findOne({ roll: roll, semester: semester, year: year })
                const result = await examResult.findOneAndUpdate({
                    roll: roll,
                    semester: semester,
                    year: year,
                }, {
                    $set: {
                        subjects: {
                            ...examRes.subjects,
                            ...sub
                        }
                    }
                })
                return result
            } catch (e) {
                return { errno: 404, ...e }
            }
        },
        getSemesterApplications: async function ({ exam_type }) {
            try {
                const results = await semesterApplication.find({
                    exam_type: exam_type,
                    checked: false
                })
                return results
            } catch (e) {
                return { errno: 404, ...e }
            }
        },
        sendResult: async function ({ roll, regulation_, year, semester }) {
            try {
                const stud = await student.findOne({ roll: roll })
                let result = await studentController.getResult({
                    roll: roll,
                    regulation_: regulation_,
                    year: year,
                    semester: semester
                })
                let body = getHTMLFormat(result)
                let status = await sendMail({ receiverMail: stud.email, mailBody: body })
                return status
            } catch (e) {
                return { errno: 404, ...e }
            }
        },
        sendAllResults: async function ({ batch, year, semester }) {
            const studs = await student.find({ batch: batch })
            for (const stud of studs) {
                try {
                    await this.sendResult({
                        roll: stud.roll,
                        regulation_: stud.regulation,
                        year: year,
                        semester: semester
                    })
                } catch (e) { }
            }
            return { message: "mails sent" }
        }
    }
}
