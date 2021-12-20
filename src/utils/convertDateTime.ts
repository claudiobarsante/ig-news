export default function ConvertDateTime(date: string, locale: string = 'pt-BR') {
	return new Date(date).toLocaleDateString(locale, {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	});
}
