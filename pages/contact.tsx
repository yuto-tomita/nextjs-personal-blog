import type { NextPage } from "next";
import { Container } from "@components/ui";
import { Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useMail } from "@lib/hooks/useMail";
import { useState } from "react";

const Contact: NextPage = () => {
  const { setMail, setName, setSubject, setBody, send, errorMessage } =
    useMail();
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const { TextArea } = Input;

  const sendBackConfirmation = () => {
    setDisplayErrorMessage(false);

    if (!Object.values(errorMessage()).some((val) => typeof val === "string")) {
      send();
      initialFormValue();
    } else {
      setDisplayErrorMessage(true);
    }
  };

  const initialFormValue = () => {
    setSubject("");
    setMail("");
    setName("");
    setBody("");
  };

  type FormObjectKey = "mail" | "name" | "subject" | "body";
  const getErrorMessage = (formObjectKey: FormObjectKey) => {
    if (displayErrorMessage) {
      return (
        <div className="text-xs text-red-500">
          {errorMessage()[formObjectKey]}
        </div>
      );
    }
  };

  return (
    <Container>
      <div className="mb-5">
        <label>件名</label>
        <Input
          placeholder="件名を入力してください"
          onChange={(e) => setSubject(e.target.value)}
        />
        {getErrorMessage("subject")}
      </div>
      <div className="mb-5">
        <label>メールアドレス</label>
        <Input
          placeholder="メールアドレスを入力してください"
          onChange={(e) => setMail(e.target.value)}
        />
        {getErrorMessage("mail")}
      </div>
      <div className="mb-5">
        <label>名前</label>
        <Input
          placeholder="名前を入力してください"
          onChange={(e) => setName(e.target.value)}
        />
        {getErrorMessage("name")}
      </div>
      <div className="mb-5">
        <label>お問い合わせ内容</label>
        <TextArea
          placeholder="お問い合わせ内容を入力してください"
          onChange={(e) => setBody(e.target.value)}
        />
        {getErrorMessage("body")}
      </div>
      <div className="ml-auto">
        <Button
          type="primary"
          shape="round"
          icon={<SendOutlined />}
          size="large"
          onClick={sendBackConfirmation}
        >
          Send
        </Button>
      </div>
    </Container>
  );
};

export default Contact;
