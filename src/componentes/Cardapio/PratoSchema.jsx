import { string, object, number, setLocale } from 'yup';
import { ptForm } from 'yup-locale-pt';

setLocale(ptForm)

export let pratoSchema = object().shape(
    {
        id: string(),
        nome: string().required().max(30).default(""),
        preco: number().required().positive().default(0)
    }
)
