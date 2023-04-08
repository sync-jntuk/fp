import student from "../models/student.js"
import regulation from "../models/regulation.js"
import examResult from "../models/examResult.js"
import semesterApplicaion from "../models/semesterApplication.js"
import metaData from "../models/metaData.js"

export default function StudentController() {
    return {
        getStreak: async function ({ roll }) {
            const meta_data = await metaData.find({}, { _id: 0 })
            const user_data = await student.findOne({ roll: roll }, {
                _id: 0,
                logins: 1,
                queries: 1
            })
            return {
                ...JSON.parse(JSON.stringify(user_data)),
                global: JSON.parse(JSON.stringify(meta_data))
            }
        },
        login: async function ({ roll, passwd }) {
            try {
                const result = await student.findOneAndUpdate({ roll: roll, passwd: passwd }, {
                    $inc: { 'logins.total': 1 }
                })
                await metaData.updateOne({ key: 'total_login_count' }, { $inc: { value: 1 } })
                delete result.passwd
                return result
            } catch (e) {
                return { errno: 404, ...e }
            }
        },
        register: async function ({ roll, first_name, last_name, email, passwd, regulation, batch }) {
            try {
                const new_student = new student({
                    roll: roll,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    passwd: passwd,
                    regulation: regulation,
                    batch: batch - 4
                })
                const result = await new_student.save()
                return result
            } catch (e) {
                return { errno: 403, ...e }
            }
        },
        updateProfile: async function ({ roll, first_name, last_name, email }) {
            let update = {}
            if (email) {
                update.email = email
            }
            if (first_name) {
                update.first_name = first_name
                update.last_name = last_name
            }
            try {
                let result = await student.findOneAndUpdate({ roll: roll }, {
                    $set: {
                        ...update
                    }
                })
                result = {
                    ...result,
                    ...update
                }
                return result
            } catch (e) {
                return { errno: 404, ...e }
            }
        },
        getResult: async function ({ roll, regulation_, year, semester }) {
            try {
                let regulation_subjects = await regulation.findOne({
                    regulation: regulation_,
                    year: year,
                    semester: semester
                })
                let marks = await examResult.findOne({
                    roll: roll,
                    year: year,
                    semester: semester
                })
                let result = JSON.parse(JSON.stringify(regulation_subjects))
                result.roll = roll
                let cumReg = 0, cumSum = 0
                for (const [k, v] of Object.entries(marks.subjects)) {
                    result.subjects[k].grade = v
                    if (v == 0 || result.subjects[k].credits < 0)
                        continue
                    cumReg += result.subjects[k] ? result.subjects[k].credits : 3
                    cumSum += v * (result.subjects[k] ? result.subjects[k].credits : 3)
                }
                result.creditSum = cumReg
                result.total = (cumSum / cumReg).toFixed(2)
                return result
            } catch (e) {
                return { errno: 404, ...e }
            }
        },
        applyForSemester: async function ({ roll, year, semester, batch, regulation_, exam_type, challana, subjects }) {
            try {
                const application = new semesterApplicaion({
                    roll: roll,
                    year: year,
                    semester: semester,
                    batch: batch,
                    regulation: regulation_,
                    exam_type: exam_type,
                    challana: challana,
                    subjects: subjects
                })
                const result = await application.save()
                return result
            } catch (e) {
                return { errno: 403, ...e }
            }
        }
    }
}
