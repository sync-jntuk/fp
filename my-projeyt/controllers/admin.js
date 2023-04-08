import admin from "../models/admin.js"
import examResult from "../models/examResult.js"
import student from "../models/student.js"
import semesterApplication from "../models/semesterApplication.js"

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
        }
    }
}
