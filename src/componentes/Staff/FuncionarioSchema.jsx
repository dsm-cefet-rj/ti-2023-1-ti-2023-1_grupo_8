import { string, object, number, setLocale } from 'yup';
import { ptForm } from 'yup-locale-pt';

setLocale(ptForm)

export let funcionarioSchema = object().shape(
    {
        id: string(),
        nome: string().required().max(30).default(""),
        cargo: string().required().max(30).default(""),
        salario: number().required().positive().default(0)
    }
)
