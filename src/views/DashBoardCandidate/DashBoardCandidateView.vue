<template>
  <div class="job-box">
    <!-- Título da Vaga -->
    <header class="job-header">
      <h1>{{ titulo }}</h1>
      <p class="empresa">{{ empresa }}</p>
      <p class="localizacao">{{ localizacao }}</p>
    </header>

    <!-- Descrição da Vaga -->
    <section class="descricao">
      <h2>Descrição</h2>
      <p>{{ descricao }}</p>
    </section>

    <!-- Requisitos -->
    <section class="requisitos">
      <h2>Requisitos</h2>
      <ul>
        <li v-for="requisito in requisitos" :key="requisito">
          {{ requisito }}
        </li>
      </ul>
    </section>

    <!-- Benefícios -->
    <section class="beneficios">
      <h2>Benefícios</h2>
      <ul>
        <li v-for="beneficio in beneficios" :key="beneficio">
          {{ beneficio }}
        </li>
      </ul>
    </section>

    <!-- Botão para Candidatura -->
    <button class="apply-btn" @click="candidatar">Candidatar-se</button>
  </div>
</template>
<script>
export default {
  name: "DashBoardUserView",
  data() {
    return {
      titulo: "Desenvolvedor Frontend",
      empresa: "Tech Solutions",
      localizacao: "São Paulo, SP",
      descricao:
        "Buscamos um desenvolvedor frontend para atuar com tecnologias como Vue.js, JavaScript e CSS. O profissional será responsável por criar interfaces interativas e funcionais.",
      requisitos: [
        "Experiência com Vue.js",
        "Conhecimento em HTML, CSS e JavaScript",
        "Experiência com controle de versão (Git)",
        "Boa comunicação",
      ],
      beneficios: [
        "Vale transporte",
        "Vale refeição",
        "Plano de saúde",
        "Ambiente de trabalho colaborativo",
      ],
    };
  },
  methods: {
    candidatar() {
      alert("Você se candidatou para a vaga de " + this.titulo);
    },
  },
};
</script>

<style scoped>
/* Estilos gerais para a caixa de vaga */
.job-box {
  font-family: Arial, sans-serif;
  width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f4f7fa;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.job-header {
  text-align: center;
  margin-bottom: 20px;
}

.job-header h1 {
  font-size: 1.8em;
  margin: 0;
  color: #333;
}

.job-header .empresa {
  font-size: 1.2em;
  color: #555;
}

.job-header .localizacao {
  font-style: italic;
  color: #777;
}

section h2 {
  font-size: 1.4em;
  color: #333;
  margin-bottom: 10px;
}

section p {
  color: #555;
}

section ul {
  list-style-type: none;
  padding: 0;
}

section ul li {
  background-color: #f1f1f1;
  margin: 5px 0;
  padding: 8px 10px;
  border-radius: 5px;
}

.apply-btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1em;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.apply-btn:hover {
  background-color: #45a049;
}
</style>
