interface AuthenticatorFormField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  secureTextEntry?: boolean;
}

const AuthenticatorFormFields: AuthenticatorFormField[] = [
  {
    name: "username",
    label: "Username",
    type: "default",
    placeholder: "Enter your preferred username",
  },
  {
    name: "nickname",
    label: "nickName",
    type: "default",
    placeholder: "Enter your preferred nickName",
  },
  {
    name: "password",
    label: "password",
    type: "default",
    placeholder: "Enter your preferred nickName",
    secureTextEntry: true,
  },
  {
    name: "email",
    label: "email",
    type: "default",
    placeholder: "Enter your preferred nickName",
  },
];

export default AuthenticatorFormFields;
