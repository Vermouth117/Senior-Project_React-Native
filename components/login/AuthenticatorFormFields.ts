
interface AuthenticatorFormField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  secureTextEntry?: boolean;
}

const AuthenticatorFormFields: any = [
  {
    name: "username",
    label: "ユーザーネーム",
    type: "default",
    placeholder: "ユーザーネームを入力してください",
  },
  {
    name: "nickname",
    label: "ニックネーム",
    type: "default",
    placeholder: "アプリでのニックネームを入力してください",
  },
  {
    name: "password",
    label: "パスワード",
    type: "default",
    placeholder: "8文字以上のパスワードを入力してください",
    secureTextEntry: true,
  },
  {
    name: "email",
    label: "email",
    type: "default",
    placeholder: "メールアドレスを入力してください",
  },
];

export default AuthenticatorFormFields;
