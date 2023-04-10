import nodemailer from 'nodemailer'

const staticMessages = {
    register: function ({ name }) {
        return `
            <div>
                <h1>Greetings from UCEK ACADEMICS</h1>
                <p>Welcome ${name}</p>
                <p>Thanks for registering into ucek acadimics portal</p>
            </div>
        `
    },
    approve_result_application: function ({ name, roll, year, semester, challana}) {
        return `
            <div>
                <h1>Update from UCEK ACADEMICS</h1>
                <p>${name} of Roll no. ${roll}</p>
                <p>Semester Application Of year: ${year}, semester: ${semester} of challana no. ${challana} has been approved</p>
            </div>
        `
    },
    approve_applications: function ({ application_type, name, roll }) {
        return `
            <div>
                <h1>Update from UCEK ACADEMICS</h1>
                <p>${name} of Roll no. ${roll}</p>
                <p>Your <b>${application_type}</b> Application has been approved</p>
            </div>
        `
    }
}

export default async function sendMail({ receiverMail, mailSubject, mailBody, static_msg, details }) {
    if (!receiverMail) {
        return "Enter a valid email address"
    }
    if (typeof receiverMail == 'string') {
        receiverMail = [receiverMail]
        mailBody = [mailBody]
    }
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "project.jntuk.2023@gmail.com",
            pass: "edgguofmpkcjwcqg"
        }
    })
    let status = {
        success: [],
        rejected: []
    }
    for (const [i, to] of receiverMail.entries()) {
        let mailOptions = {
            from: "jntuk",
            subject: mailSubject || 'mail from UCEK Academics',
            to: to,
            html: `${mailBody[i]}`
        }
        if (staticMessages.hasOwnProperty(static_msg)) {
            mailOptions.html = staticMessages[static_msg](details)
        }
        transporter.sendMail(mailOptions, (err, data) => {
            if (err || data.rejected.length) {
                status.rejected.push(to)
                console.log(to + ' rejected')
            } else {
                console.log(to + ' accepted')
                status.success.push(to)
            }
        })
        return status
    }
}
