import React from 'react'
import { useLocation } from 'react-router-dom'
import useBearStore from '../../context/useStore'
import styles from './imagePreloader.module.scss'
const images = [
	'/images/TO_CONVENTION.png',
	'/images/convention.png',
	'/images/multi-carrier.png',
	// Add other images as needed
]

function ImagePreloader() {
	const { pathname } = useLocation()
	const { currentPage } = useBearStore()
	React.useEffect(() => {
		console.log(currentPage)
	}, [currentPage])
	return (
		<div className={styles.body}>
			<div style={{ display: 'none' }}>
				{images.map((image, index) => (
					<img key={index} src={image} alt={`Preloaded image ${index}`} />
				))}
			</div>
			{(currentPage === 'home' || pathname === '/') && (
				<img src={images[0]} alt='bg' className={styles.imgPreload} />
			)}
			{(currentPage === 'convention' || pathname === '/convention') && (
				<img src={images[1]} alt='bg' className={styles.imgPreload} />
			)}
			{(currentPage === 'multi-carrier' || pathname === '/multi-carrier') && (
				<img src={images[2]} alt='bg' className={styles.imgPreload} />
			)}
		</div>
	)
}

export default ImagePreloader
