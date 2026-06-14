import Search from "../components/search"
import Section from "../components/section"

const HomePage = () => {
  return (
    <div>
      <Search />
      <div className="my-6">
        <h1 className="font-bold text-lg md:text-3xl">Discover Movies</h1>
        <p>Find and explore your next favourite movie.</p>
      </div>
      <div className="space-y-8">
        <Section details={{sectionName: "Now Playing", movieType: "now_playing"}} />
        <Section details={{sectionName: "Popular Movies", movieType: "popular"}} />
      </div>
    </div>
  )
}

export default HomePage
