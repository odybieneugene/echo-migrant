import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
//import FeaturedArticle from "../components/FeaturedArticle";
import RecentArticles from "../components/RecentArticles";
import FeaturedVideos from "../components/FeaturedVideos";
// import SeeAlso from "../components/SeeAlso";
import Newsletter from "../components/Newsletter";
import AVoir from "../components/AVoir";





function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      {/*<FeaturedArticle />*/}
      <RecentArticles />
      <FeaturedVideos />
      <Newsletter />
      {/* <SeeAlso /> */}
      <AVoir />
      <Footer />
    </div>
  );
}

export default Home;
