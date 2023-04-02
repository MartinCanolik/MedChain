import * as Yup from "yup";

const phoneRx =
	/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
const noSpaceAllowedRx = /^\S*$/;

export const validationSchema = Yup.object({
	firstName: Yup.string()
		.max(20, "(No puede contener más de 20 caracteres)")
		.min(3, "(Al menos debe contener 3 caracteres)")
		.matches(noSpaceAllowedRx, "Nombre no válido")
		.required("*"),
	lastName: Yup.string()
		.max(20, "(No puede contener más de 20 caracteres)")
		.min(3, "(Al menos debe contener 3 caracteres)")
		.matches(noSpaceAllowedRx, "(Apellido no válido)")
		.required("*"),
	email: Yup.string().email("(Direccion de mail invalida)").required("*"),

	query: Yup.string().max(400, "(consulta demasiado extensa)").required("*"),

	phone: Yup.string().matches(phoneRx, "(Número no válido)").required("*"),

	startDate: Yup.string().max(10, "formato de fecha no valido").required("*"),

	endDate: Yup.string().max(10, "formato de fecha no valido").required("*"),
	adults: Yup.number().max(
		10,
		"No hay suficiente lugar disponible para realizar su reserva"
	),
	children: Yup.number().max(
		10,
		"No hay suficiente lugar disponible para realizar su reserva"
	),
});
