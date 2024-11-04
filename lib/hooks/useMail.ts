import { useState } from "react";

export const useMail = () => {
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const errorMessage = () => {
    return {
      mail: mail.length ? null : "メールアドレスを入力してください",
      name: name.length ? null : "名前を入力してください",
      subject: subject.length ? null : "件名を入力してください",
      body: body.length ? null : "お問い合わせ内容を入力してください",
    };
  };

  const send = async () => {
    await fetch("/api/mail", {
      method: "POST",
      body: createBody(),
    });
  };

  const createBody = () => {
    return `
件名：${subject}

名前：${name}

メールアドレス：${mail}

お問い合わせ内容：${body}
		`;
  };

  return {
    setMail,
    setName,
    setSubject,
    setBody,
    send,
    errorMessage,
  };
};
