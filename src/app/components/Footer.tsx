import { getPageNums } from "@/lib/helpers";
import Link from "next/link";

type Props = {
  topic: string;
  page?: string;
  prevPage?: string | null;
  nextPage?: string | null;
};

export default function Footer({ topic, page, prevPage, nextPage }: Props) {
  const pageNums = getPageNums(prevPage, nextPage);

  const renderPrevPageLink = () =>
    prevPage && (
      <Link
        href={`/results/${topic}/${prevPage}`}
        className={!nextPage ? "mx-auto" : ""}
      >
        &lt;&lt;&lt; {!nextPage && "Back"}
      </Link>
    );

  const renderNextPageLink = () =>
    nextPage && (
      <Link
        href={`/results/${topic}/${nextPage}`}
        className={!prevPage ? "mx-auto" : ""}
      >
        {!prevPage && "More"} &gt;&gt;&gt;
      </Link>
    );

  const renderPageNumbers = () =>
    pageNums.map((num) =>
      page && num === parseInt(page) ? (
        <span key={num}>{num}</span>
      ) : (
        <Link key={num} href={`/results/${topic}/${num}`} className="underline">
          {num}
        </Link>
      )
    );

  return (
    <footer className="flex flex-row justify-between items-center px-2 py-4 font-bold w-60 mx-auto">
      {renderPrevPageLink()}
      {renderPageNumbers()}
      {renderNextPageLink()}
    </footer>
  );
}
