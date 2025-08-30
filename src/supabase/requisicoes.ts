import { supabase } from "./client"


// Função de busca permanece a mesma
export async function buscarInscricoes() {
    return await supabase.from("inscricoes")
        .select("*")
        .then(({ data, error }) => {
            if (error) {
                console.error("Erro ao buscar inscrições");
                return [];
            }
            return data;
        });
}


export async function buscarUsuarios() {
    return await supabase.from("usuarios")
        .select("*")
        .then(({ data, error }) => {
            if (error) {
                console.error("Erro ao buscar usuarios");
                return [];
            }
            return data;
        });
}