// Cambia esto por la fecha de cumple de tu amigo (día y mes, sin el año)
const CLAVE = "0610";

function entrar() {
    const valor = document.getElementById("clave").value;
    if (valor === CLAVE) {
        mostrar("menu");
    } else {
        document.getElementById("error").textContent = "❌ Fecha incorrecta, inténtalo de nuevo";
    }
}

function mostrar(pantalla) {
    // Ocultar todas
    document.querySelectorAll(".pantalla").forEach(p => p.classList.add("oculto"));
    // Mostrar la elegida
    document.getElementById("pantalla-" + pantalla).classList.remove("oculto");
}

function elegir(opcion) {
    const resultado = document.getElementById("resultado");
    resultado.classList.remove("oculto");
    if (opcion === "camiseta") {
        resultado.textContent = "👕 ¡Camiseta anotada! Te la compro en cuanto pueda. Pero dime cuál quieres ;v";
        document.getElementById("texto-libre").classList.remove("oculto");
        document.getElementById("btn-enviar").classList.remove("oculto");
    } else if (opcion === "material") {
        resultado.textContent = "📚 ¡Material escolar anotado! Dime qué te hace falta :)";
        document.getElementById("texto-libre").classList.remove("oculto");
        document.getElementById("btn-enviar").classList.remove("oculto");
    } else {
        resultado.textContent = "✍️ ¡Cuéntame qué quieres! Pero no, no te puedo comprar o dar personas ni nada que cueste MUY caro. ";
        document.getElementById("texto-libre").classList.remove("oculto");
        document.getElementById("btn-enviar").classList.remove("oculto");
    }
}

async function enviar() {
    const texto = document.getElementById("texto-libre").value;
    if (!texto) {
        document.getElementById("resultado").textContent = "Escribe algo primero 😉";
        return;
    }

    const resultado = document.getElementById("resultado");
    resultado.textContent = "📨 Enviando...";

    try {
        // Cambia esta URL por la tuya de Formspree
        const respuesta = await fetch("https://formspree.io/f/xdeagrjy", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({ mensaje: texto })
        });

        if (respuesta.ok) {
            resultado.textContent = "✅ ¡Enviado! Gracias por elegir 😊";
            document.getElementById("texto-libre").classList.add("oculto");
            document.getElementById("btn-enviar").classList.add("oculto");
        } else {
            resultado.textContent = "⚠️ Algo falló al enviar. Inténtalo de nuevo.";
        }
    } catch (error) {
        resultado.textContent = "⚠️ No se pudo enviar (¿tienes internet bro?).";
    }
}