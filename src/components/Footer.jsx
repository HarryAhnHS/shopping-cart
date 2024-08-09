import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <>
            <section className="footer">
                <div className="py-6 flex justify-center items-center bg-[#283618] text-white">
                    Developed by @HarryAhnHS
                    <a href="https://github.com/HarryAhnHS" target="_blank" className="m-2 text-white w-[24px] flex items-center justify-center">
                        <FontAwesomeIcon icon={faGithub} className='h-full w-full'/>
                    </a>
                </div>
            </section>
        </>
    )
}

export default Footer;