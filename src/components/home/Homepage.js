import "./Homepage.css"

export const HomePage = () => {
    return <>
    <section>
        <div className="image_container">
          <img className="yoga-img2" src={process.env.PUBLIC_URL + "/Images/Female-Meditator-Blue-Background.jpeg"} alt ="female-meditator" />
        </div>
    </section>
    <section class="hero">
      <div class="text_overlay">
        <div class="container">
        <h1 className="homepage_title">Meditation Made Simple</h1>
          <p>Join our meditation community to find the perfect retreats for you and connect with others who focus on improving mind, body and soul.</p>
        </div>
      </div>
    </section> 
</>
}

