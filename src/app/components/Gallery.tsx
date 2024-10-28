import fetchImages from "@/lib/fetchImages";
import type { ImagesResults } from "@/models/Images";
import ImageContainer from "./ImageContainer";
import addBlurredDataUrls from "@/lib/getBase64";
import getPrevNextPages from "@/lib/getPrevNextPages";
import Footer from "./Footer";

type Props = {
  topic?: string;
  page?: string;
};

const BASE_URL = "https://api.pexels.com/v1/search?query=";

export default async function Gallery({ topic = "monochrome", page }: Props) {
  const query = `${topic} monochrome`;
  const url = `${BASE_URL}${encodeURIComponent(query)}${
    page ? `&page=${page}` : ""
  }`;

  let images: ImagesResults | undefined;
  try {
    images = await fetchImages(url);
  } catch (error) {
    console.error("Error fetching images:", error);
    return <h2 className="m-4 text-2xl font-bold">Failed to Load Images</h2>;
  }

  if (!images || images.per_page === 0) {
    return <h2 className="m-4 text-2xl font-bold">No Images Found</h2>;
  }

  const photosWithBlur = await addBlurredDataUrls(images);
  const { prevPage, nextPage } = getPrevNextPages(images);
  const footerProps = { topic, page, nextPage, prevPage };

  return (
    <>
      <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px]">
        {photosWithBlur.map((photo) => (
          <ImageContainer key={photo.id} photo={photo} />
        ))}
      </section>
      <Footer {...footerProps} />
    </>
  );
}
