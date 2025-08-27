document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formVenda");
    const mensagem = document.getElementById("mensagem");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const produto = document.getElementById("produto").value;
        const valor = document.getElementById("valor").value;
        const cliente = document.getElementById("cliente").value;

        const resp = await fetch("/vendas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ produto, valor, cliente })
        });

        const data = await resp.json();
        mensagem.textContent = data.message;

        form.reset();
    });
});
