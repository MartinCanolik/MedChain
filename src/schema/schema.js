import * as Yup from "yup";

const phoneRx =
	/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
const noSpaceAllowedRx = /^\S*$/;

export const validationSchema = Yup.object({
	patientName: Yup.string()
		.max(20, "(No puede contener más de 20 caracteres)")
		.min(3, "(Al menos debe contener 3 caracteres)")
		.matches(noSpaceAllowedRx, "Nombre no válido")
		.required("*"),
	doctorName: Yup.string()
		.max(20, "(No puede contener más de 20 caracteres)")
		.min(3, "(Al menos debe contener 3 caracteres)")
		.matches(noSpaceAllowedRx, "(Apellido no válido)")
		.required("*"),
	email: Yup.string().email("(Direccion de mail invalida)").required("*"),
	frequency: Yup.number().required("*"),
	medicineName: Yup.string()
		.max(20, "(No puede contener más de 20 caracteres)")
		.min(3, "(Al menos debe contener 3 caracteres)")
		.matches(noSpaceAllowedRx, "(Apellido no válido)")
		.required("*"),

	issuedDate: Yup.string().max(10, "formato de fecha no valido").required("*"),

	expiryDate: Yup.string().max(10, "formato de fecha no valido").required("*"),
	dosage:
		Yup.number()
		.required("*"),
});
