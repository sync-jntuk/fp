import student from "../models/student.js"
import regulation from "../models/regulation.js"
import examResult from "../models/examResult.js"
import semesterApplicaion from "../models/semesterApplication.js"
import certificateApplication from "../models/cerificationAppliction.js"
import metaData from "../models/metaData.js"
import sendMail from "../utility_modules/mailHandler.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

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
        register: async function ({ roll, first_name, last_name, email, passwd, regulation, batch, graduation_type }) {
            try {
                const join_year = {
                    'Btech': 4,
                    'Mtech': 2,
                }
                const data = {
                    roll: roll,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    graduation_type: graduation_type,
                    passwd: passwd,
                    regulation: regulation,
                    batch: batch - join_year[graduation_type],
                }
                await student.validate(data)
                if (await student.findOne({ roll: roll })) {
                    throw new Error("duplicate roll number")
                }
                if (await student.findOne({ email: email })) {
                    throw new Error("duplicate email address")
                }
                const token = jwt.sign({ data: data }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
                await sendMail({ receiverMail: email, static_msg: 'register', details: { name: first_name, token: token } })
                return { message: "emailsent" }
            } catch (e) {
                return { errno: 403, ...e }
            }
        },
        emailVerification: async function ({ token }) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
                const new_student = new student(decoded.data)
                const result = await new_student.save()
                return result
            } catch (e) {
                return { errno: 404, ...e }
            }
        },
        updateProfile: async function ({ roll, first_name, last_name, email, picture }) {
            let update = {}
            if (email) {
                update.email = email
            }
            if (first_name) {
                update.first_name = first_name
                update.last_name = last_name
            }
            if (picture) {
                update.picture = picture
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
        updatePasswd: async function ({ roll, passwd, npasswd }) {
            try {
                const result = await student.updateOne({ roll: roll, passwd: passwd }, { passwd: npasswd })
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
        },
        applyForCertificates: async function ({ roll, email, application_type, name, purpose, duration, DU_number, date_of_payment }) {
            try {
                const certificate = new certificateApplication({
                    roll: roll,
                    email: email,
                    application_type: application_type,
                    name: name,
                    purpose: purpose,
                    duration: duration,
                    DU_number: DU_number,
                    date_of_payment: date_of_payment
                })
                const result = await certificate.save()
                return result
            } catch (e) {
                return { errno: 403, ...e }
            }
        },
        getCertificateStatus: async function ({ roll }) {
            try {
                const result = await certificateApplication.find({ roll: roll })
                return result
            } catch (e) {
                return { errno: 404, ...e }
            }
        }
    }
}
