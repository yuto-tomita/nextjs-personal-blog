import type { InferGetStaticPropsType } from "next";
import Link from "next/link";
import {
  getMdFileFromDir,
  readFileFromFileName,
  parseMdFile,
} from "@lib/MdFileOperation";
import { Text } from "@components/ui";

export async function getStaticProps() {
  const mdFileNames = getMdFileFromDir("resume");
  const mdFile = mdFileNames.map((fileName) =>
    readFileFromFileName(fileName, "resume"),
  );
  const parseMarkdownContent = mdFile
    .map((markdown) => {
      const parseMdContent = parseMdFile(markdown);

      return {
        title: parseMdContent.data.title,
        content: parseMdContent.content,
        slug: parseMdContent.data.slug,
        image: parseMdContent.data.image,
        description: parseMdContent.data.description,
      };
    })
    .reverse();

  return {
    props: {
      parseMarkdownContent,
    },
  };
}

const Resume = ({
  parseMarkdownContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <div className="w-6/12 m-auto mt-10">
        <Text variant="title" className="mb-6">
          やりたいこと
        </Text>

        <p className="mb-6 text-xs">
          仕事としてやりたいことは、フロントエンドを仕事としてやってきているのでフロントエンドの開発をやっていきたいと思っています。中でもReactを実際に実務で使用してみたいと考えています。
          <br />
          理由としては、Reactの方がよりJavaScriptらしさが強い点や、わかりやすい規約にVueよりもベストプラクティスを追いやすい点が魅力で仕事でも使ってみたいと思いました。
          <br />
          <br />
          技術の移り変わりやライブラリの発展のスピードが早くキャッチアップをしていて楽しいのでフロントエンドの勉強してますが、強いこだわりはなく、求められればバックエンドやインフラといった別のことにもチャレンジしてみたいと考えており、現職でもバックエンドに関しては一部担当しております。
        </p>

        <Text variant="title" className="mb-6">
          志向性
        </Text>

        <p className="mb-6 text-xs">
          変化を恐れず、常に新しい挑戦をして成長したいと思っています。
          <br />
          自分のスキルが他の会社で通用するのかという漠然とした不安があり、実際に副業を始めてみて知らなかった会社のフロントエンドの開発に従事したり、オフラインの勉強会やLT会に参加してみて他のエンジニアと交流してみるといったことをしてきました。
          <br />
          挑戦してみると遅れていた割には意外となんとかなることを知ったり、自分のスキルが意外と役に立っているという実感を副業先で知ることができました。
          <br />
          このように自身の成長を促してくれそうな挑戦を今後も続けていきたいと考えています。
        </p>

        <Text variant="title" className="mb-6">
          職務経歴
        </Text>
        {parseMarkdownContent.map((val, index) => {
          return (
            <div key={index} className="pb-8">
              <h1 className="font-bold text-xl">{val.slug}</h1>

              <p>{val.title}</p>
              <Link href={`/resume/${encodeURIComponent(val.slug)}`}>
                <span className="ml-4 text-cyan-500 cursor-pointer">
                  &gt;&gt; 詳細
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Resume;
