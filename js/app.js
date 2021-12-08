$(document).ready(function () {
  const filmesPopular =
    "https://api.themoviedb.org/3/movie/popular?api_key=09bd0e330ff0ced4965d7b94a28ed1d0&language=pt-BR&page=1";
  const filmesPesquisados =
    "https://api.themoviedb.org/3/search/movie?api_key=09bd0e330ff0ced4965d7b94a28ed1d0&language=pt-BR&query=";

  const gerarFilmes = () => {
    $.ajax({
      url: filmesPopular,
      method: "GET",
      success: function (data) {
        gerarJson(data);
      },
    });
  };

  $(".navbar-brand").click(function (e) {
    e.preventDefault();
    $("main").empty();
    gerarFilmes();
    $(".form-control").val("");
  });

  gerarFilmes();

  const pesquisarFilmes = (pesquisa) => {
    $.ajax({
      url: filmesPesquisados + pesquisa,
      method: "GET",
      success: function (data) {
        $("main").empty();
        gerarJson(data);
      },
      error: function (error) {
        $("main").empty();
      },
    });
  };

  $("form").submit(function (e) {
    e.preventDefault();
    const valorForm = e.target.querySelector("input").value.trim();
    if (valorForm) {
      pesquisarFilmes(valorForm);
    }
  });

  function gerarJson(data) {
    $.each(data.results, function (indexInArray, filme) {
      let nota;
      let img = filme.poster_path
        ? "https://image.tmdb.org/t/p/w500" + filme.poster_path
        : "img/error.jpg";
      console.log(img);
      let sinopse = filme.overview
        ? filme.overview
        : "Não há sinopse disponível";

      if (filme.vote_average >= 8) {
        nota = "success";
      } else if (filme.vote_average >= 6 && filme.vote_average < 8) {
        nota = "warning";
      } else {
        nota = "danger";
      }

      $("main").append(`<div class="card mb-5 flex-fill shadow-lg">
        <img
          src="${img}"
          class="card-img-top flex-fill img-fluid"
         
          alt="${filme.title}"
        />
        <div
          class="card-body flex-fill d-flex justify-content-between align-items-center"
        >
          <h2>${filme.title}</h2>
          <span class="badge bg-badge text-${nota} p-3">${filme.vote_average}</span>
        </div>
        <div class="card-body visaoGeral flex-fill">
          <h3>Sinopse</h3>
          <p>
            ${sinopse}
          </p>
        </div>
      </div>`);
    });
  }
});
