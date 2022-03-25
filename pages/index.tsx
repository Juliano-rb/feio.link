import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ReactTypingEffect from "react-typing-effect";
import { Button, TextArea } from "../components";
import { FormEvent, useState } from "react";
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

const Home: NextPage = () => {
  const [shortenedUrl, setShortenedUrl] = useState<string>("");
  return (
    <div className={styles.container}>
      <Head>
        <title>Deixe seu link feio</title>
        <meta name="description" content="Generated by create next app" />
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

        {shortenedUrl && (
          <div>
            <h3>Olha só seu resultado:</h3>
            <TextArea id="result" name="result" value={shortenedUrl}>
              <Button
                type="button"
                value="Copiar"
                onClick={(e) => {
                  navigator.clipboard.writeText(shortenedUrl);
                  alert("Copiado!");
                }}
              />
            </TextArea>
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
