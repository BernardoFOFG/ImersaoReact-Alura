import React from "react";
import { StyledRegisterVideo, StyledAvisoDeRefresh } from "./styles";
import { createClient } from "@supabase/supabase-js";


// Whiteboarding
// Custom Hook
function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues);

  return {
    values,
    handleChange: (evento) => {
      console.log(evento.target);
      const value = evento.target.value;
      const name = evento.target.name;
      setValues({
        ...values,
        [name]: value,
      });
    },
    clearForm() {
      setValues({});
    },
  };
}

function refresh() {
  window.location.reload;
}

const PROJECT_URL = "https://annbbupcsuxgicyuyjnb.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFubmJidXBjc3V4Z2ljeXV5am5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0NDk1MTEsImV4cCI6MTk4NDAyNTUxMX0._ns8knRRCD6q4Q8zt7-uEjGtkkylrtZOHQTkMMx-YLg";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

// get youtube thumbnail from video url
function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

// function getVideoId(url) {
//     const videoId = url.split("v=")[1];
//     const ampersandPosition = videoId.indexOf("&");
//     if (ampersandPosition !== -1) {
//         return videoId.substring(0, ampersandPosition);
//     }
//     return videoId;
// }

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: {
      titulo: "",
      url: "",
      playlist: "",
    },
  });
  const [formVisivel, setFormVisivel] = React.useState(false);
  /*
    ## O que precisamos para o form funcionar?
    - pegar os dados, que precisam vir do state
        - titulo
        - url do vídeo 
    - precisamos ter um onSubmit do nosso form
    - Limpar o formulário após o Submit
    */

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {/* Ternário */}
      {/* Operadores de Curto-circuito */}
      {formVisivel && (
        <form
          onSubmit={(evento) => {
            evento.preventDefault();
            console.log(formCadastro.values);

            // Contrato entre o nosso Front e o BackEnd
            supabase
              .from("video")
              .insert({
                title: formCadastro.values.titulo,
                url: formCadastro.values.url,
                thumb: getThumbnail(formCadastro.values.url),
                playlist: formCadastro.values.playlist,
              })
              .then((oqueveio) => {
                console.log(oqueveio);
              })
              .catch((err) => {
                console.log(err);
              });

            setFormVisivel(false);
            formCadastro.clearForm();
          }}
        >
          <div>
            <button
              type="button"
              className="close-modal"
              onClick={() => setFormVisivel(false)}
            >
              X
            </button>
            <input
              placeholder="Titulo do vídeo"
              name="titulo"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
              required
            />
            <input
              placeholder="URL"
              name="url"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
              required
            />
            <input
              placeholder="Playlist"
              name="playlist"
              value={formCadastro.values.playlist}
              onChange={formCadastro.handleChange}
              required
            />
            <button type="submit">Cadastrar</button>
            {<img src={getThumbnail(formCadastro.values.url)} />}
            <StyledAvisoDeRefresh>
              <h2>
                Lembre-se de dar f5 assim que adicionar um video!
              </h2>
            </StyledAvisoDeRefresh>
          </div>
        </form>
      )}
    </StyledRegisterVideo>
  );
}

// [X] Falta o botão para adicionar
// [X] Modal
// -> [X] Precisamos controlar o state
// -> Formulário em si
