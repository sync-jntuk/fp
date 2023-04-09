import nodemailer from 'nodemailer'

export default async function sendMail({ receiverMail, mailSubject, mailBody }) {
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
        const mailOptions = {
            from: "jntuk",
            subject: mailSubject || 'mail from UCEK Academics',
            to: to,
            html: `${mailBody[i]}`
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
