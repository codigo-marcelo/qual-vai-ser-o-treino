const menu = document.querySelector("#menu")
const form = menu.querySelector("form")
const botao = menu.querySelector("button")
const inputRefeicao = document.querySelector("#refeicao")
let valores = []
const tabela = document.querySelector("#escadinha")
const tbody = tabela.querySelector("tbody")
const total = tabela.querySelector(".total")

inputRefeicao.focus()

botao.addEventListener("click", function (evento) {
  if (!form.checkValidity()) return

  evento.preventDefault()
  valores = escadinha()
  deletarTabela()
  criarTabela()

  tabela.parentElement.classList.remove("esconder")
  alert("Escadinha da Brena calculada!")
})

function deletarTabela() {
  const trs = tbody.querySelectorAll("tr")

  if (trs) trs.forEach(tr => tr.remove())
}

function criarTabela() {
  for (let i = 0; i < valores.length; i++) {
    const tr = document.createElement("tr")
    tbody.append(tr)

    const tdMembro = document.createElement("td")
    tdMembro.textContent = i + 2 + "º"
    tr.append(tdMembro)

    const tdValor = document.createElement("td")
    tdValor.textContent = valores[i]
    tr.append(tdValor)
  }

  total.textContent = Number(inputRefeicao.value).toFixed(2).replace(".", ",")
}

function escadinha() {
  const membros = document.querySelector("#membros").value
  const refeicao = document.querySelector("#refeicao").value
  const valores = []

  let porcentagem = 1
  let divisor = 0

  for (let i = 1; i < membros; i++) {
    divisor += porcentagem
    porcentagem *= 1.1
  }

  let preco = refeicao / divisor
  let total = preco

  for (let i = 1; i < membros; i++) {
    const valor = preco.toFixed(2)
    total += preco *= 1.1
    valores.push(valor.replace(".", ","))
  }
  return valores
}
