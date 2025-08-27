document.addEventListener("DOMContentLoaded", () => {

    async function carregarVendas() {
        const resp = await fetch("/vendas");
        const vendas = await resp.json();

        const tbody = document.querySelector("#tabelaVendas tbody");
        const nenhum = document.getElementById("nenhum");

        tbody.innerHTML = "";

        if (vendas.length === 0) {
            nenhum.style.display = "block";
            document.getElementById("tabelaVendas").style.display = "none";
        } else {
            nenhum.style.display = "none";
            document.getElementById("tabelaVendas").style.display = "table";

            vendas.forEach(v => {
                let row = document.createElement("tr");

                row.innerHTML = `
                    <td>${v.id}</td>
                    <td>${v.produto}</td>
                    <td>R$ ${parseFloat(v.valor).toFixed(2)}</td>
                    <td>${v.cliente}</td>
                    <td><button class="excluir" data-id="${v.id}">Excluir</button></td>
                `;
                tbody.appendChild(row);
            });

            // Adiciona evento de exclusão
            document.querySelectorAll(".excluir").forEach(btn => {
                btn.addEventListener("click", async () => {
                    const id = btn.getAttribute("data-id");
                    if(confirm("Deseja realmente excluir esta venda?")) {
                        await fetch(`/vendas/${id}`, { method: "DELETE" });
                        carregarVendas(); // atualiza a lista
                    }
                });
            });
        }
    }

    carregarVendas();
});
