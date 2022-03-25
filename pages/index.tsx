import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ReactTypingEffect from "react-typing-effect";
import { Button, TextArea } from "../components";
import { createRef, FormEvent, useState } from "react";
import axios from "axios";

const UGLY_WORDS = ["BOLSONARO", "SUA MÃE", "O FDP DO PUTIN"];

const submitData = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const target = e.target as typeof e.target & {
    url: { value: string };
  };

  const url = target.url.value;

  const response = await axios.post<string>("/api/shorten", {
    url,
  });

  return response.data;
};

const copyResultToClipboard = async (resultElement: HTMLTextAreaElement) => {
  /* Select the text field */
  await resultElement?.select();
  await resultElement?.setSelectionRange(0, 99999); /* For mobile devices */

  // @ts-ignore
  navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
    if (result.state == "granted" || result.state == "prompt") {
      if (!navigator.clipboard) {
        alert("Erro ao copiar");
        return;
      }

      /* Copy the text inside the text field */
      navigator.clipboard.writeText(resultElement?.value || "");

      alert("Copiado!");
    }
  });
};

const Home: NextPage = () => {
  const [shortenedUrl, setShortenedUrl] = useState<string>("");
  const resultRef = createRef<HTMLTextAreaElement>();

  return (
    <div className={styles.container}>
      <Head>
        <title>O encurtador de links que deixa seu link feio</title>
        <meta
          name="description"
          content="O Feio é um encurtador diferente que busca encurtar links com palavras que vão assustar seus amigos. Encurte seus links que brinque com seus amigos."
        />
        <meta name="keywords" content="Encurtador,links,troll." />
        <meta property="og:title" content="Feio - Encurtador de URL"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:locale" content="pt-BR"></meta>
        <meta
          property="og:site_name"
          content="Feio - Encurtador de Link"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Deixe seu link mais feio que <br />
          <ReactTypingEffect
            eraseSpeed={100}
            typingDelay={100}
            text={UGLY_WORDS}
          />
        </h1>

        {!shortenedUrl && (
          <form
            className={styles.form}
            onSubmit={async (e: FormEvent<HTMLFormElement>) => {
              try {
                const url = await submitData(e);
                setShortenedUrl(url);
              } catch (error) {
                console.error(error);
              }
            }}
          >
            <TextArea name="url" placeholder="cole seu link aqui" />

            <Button type="submit" value="Enviar" />
          </form>
        )}

        {shortenedUrl && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3>Olha só seu resultado:</h3>
            <TextArea
              internalRef={resultRef}
              id="result"
              name="result"
              value={shortenedUrl}
              onClick={async (e: any) => {
                await resultRef.current?.select();
                await resultRef.current?.setSelectionRange(
                  0,
                  99999
                ); /* For mobile devices */
              }}
            >
              <Button
                color="#47FF63"
                border="1px solid #3EDA55"
                type="button"
                value="Copiar"
                onClick={async (e) => {
                  resultRef.current && copyResultToClipboard(resultRef.current);
                }}
              />
            </TextArea>
            <Button
              width="100px"
              type="submit"
              value="Voltar"
              onClick={() => {
                setShortenedUrl("");
              }}
            />
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.paypal.com/donate/?hosted_button_id=Q5DYVYRNFDW5E"
          target="_blank"
          rel="noopener noreferrer"
        >
          me pague um café
        </a>
      </footer>
    </div>
  );
};

export default Home;
