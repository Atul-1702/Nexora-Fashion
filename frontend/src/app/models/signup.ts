export default interface SignupModel {
  name: string;
  email: string;
  password: string;
  ["confirm-password"]?: string;
}
