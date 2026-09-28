$(document).ready(function () {

    $("#buscar").click(function () {

        var usuario = $("#usuario").val();

        if (usuario == "") {
            $("#mensaje").html('<div class="alert alert-warning">Escribe un nombre de usuario.</div>');
            return;
        }

        var url = "https://api.github.com/users/" + usuario + "/repos";

        $("#repositorios").empty();
        $("#mensaje").empty();

        $.get(url, function (datos) {

            if (datos.length == 0) {
                $("#mensaje").html('<div class="alert alert-info">Este usuario no tiene repositorios públicos.</div>');
            }

            $.each(datos, function (i, repo) {

                var descripcion = repo.description;

                if (descripcion == null) {
                    descripcion = "Sin descripción";
                }

                var fila =
                    "<tr>" +
                    "<td>" + repo.name + "</td>" +
                    "<td>" + descripcion + "</td>" +
                    "<td>" + repo.watchers_count + "</td>" +
                    "</tr>";

                $("#repositorios").append(fila);

            });

        }).fail(function () {

            $("#mensaje").html('<div class="alert alert-danger">No se ha encontrado el usuario.</div>');

        });

    });

});