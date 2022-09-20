import "./Homepage.css"
import FacebookIcon from '@mui/icons-material/Facebook';
import { blue } from '@mui/material/colors';

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
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam
            earum ratione illum, reiciendis consequatur harum hic, laboriosam
            accusantium fuga numquam similique libero quia laborum eveniet
            obcaecati eius ullam dolorem culpa quidem! Mollitia placeat
            voluptates, nisi molestias dolorum accusantium voluptatum doloremque
            eos vel impedit similique quo, quasi cum ea cumque at aut quos,
            fugiat explicabo autem illo atque eaque? Iste
          </p>
        </div>
      </div>
    </section> 
</>
}

