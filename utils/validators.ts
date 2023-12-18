import * as yup from "yup";

export const LoginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Неверная формат почты")
    .required("Почта обязательная"),
  password: yup
    .string()
    .min(6, "Пароль должен быть не менее 6 символов")
    .required("Пароль обязательный"),
});

export const ForgotPasswordFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Неверная формат почты")
    .required("Почта обязательная"),
});

export const SetNewPasswordFormSchema = yup.object().shape({
  token: yup.string().required(),
  password: yup
    .string()
    .min(6)
    .required()
    .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: "Простой пароль",
    }),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must and should match"),
});

export const UpdatePasswordFormSchema = yup.object().shape({
  password: yup
    .string()
    .min(6)
    .required()
    .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: "Простой пароль",
    }),
  newPassword: yup
    .string()
    .min(6)
    .required()
    .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: "Простой пароль",
    }),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("newPassword")], "Passwords must and should match"),
});

export const RegisterFormSchema = yup.object().shape({
  email: yup.string().email("Неверная почта").required("Почта обязательная"),
  password: yup
    .string()
    .min(6)
    .required()
    .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: "Простой пароль",
    }),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must and should match"),
});

export const updateUserFormSchema = yup.object().shape({
  email: yup.string().email("Неверная почта").required("Почта обязательная"),
  nickName: yup.string().optional(),
  telegram: yup.string().optional(),
});

export const CreateServerFormSchema = yup.object().shape({
  name: yup.string().required("Имя сервера обязательно"),
  link: yup
    .string()
    .url("Невеверный формат url")
    .required("Ссылка обязательна"),
  rates: yup.number().typeError("Только числа").required("Рейты обазательны"),
  chronic: yup.string().notOneOf([""], "Вы должны выбрать хронику"),
  open_date: yup.date().required("Дата открытия обязательна"),
  server_tags: yup.array().max(3, "Максимум 3 тега").optional(),
  server_type: yup.string().required("A radio option is required"),
});

export const UpdateServerFormSchema = yup.object().shape({
  chronic: yup.string().optional().notOneOf([""], "Вы должны выбрать хронику"),
  server_tags: yup.array().optional().max(3, "Максимум 3 тега").optional(),
  server_type: yup.string().optional().required("A radio option is required"),
});
