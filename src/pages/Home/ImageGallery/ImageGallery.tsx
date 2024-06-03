import { useRef, useState } from 'react';
import './ImageGallery.css';

interface ImageGalleryProps {
  /* images [url] to display */
  images: string[];
  /* define mode: in edit we have delete image */
  editMode: boolean;
  /* parent callback to delete image when mode is edit */
  onDeleteClick?: (index: number) => void;
}
/**
 * Image gallery component
 * Shows gallery with images, support 2 mode - default and edit
 * In edit mode we can delete image
 * @param {any} images images [url] to display
 * @param {any} editMode define mode
 * @param {any} onDeleteClick parent callback to delete image when mode is edit
 * @returns {JSX.Element}
 */

const ImageGallery = ({
  images,
  editMode,
  onDeleteClick,
}: ImageGalleryProps) => {
  const [image, setImage] = useState('');
  const dialogRef = useRef<HTMLDialogElement>(null);

  const onOutsideClick = (event: MouseEvent) => {
    if (event.target === dialogRef.current) dialogRef.current.close();
  };

  const onImageClick = (image: string) => {
    setImage(image);
    const dialog = dialogRef.current;
    dialog?.showModal();
  };

  return (
    <div className="gallery__images" data-testid="image-gallery">
      {images &&
        images.map((image, index) => (
          <div className="gallery__image-wrapper" key={image}>
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="gallery__image"
              onClick={() => onImageClick(image)}
            />
            {editMode && (
              <button
                type="button"
                className="gallery__image-delete"
                onClick={() => onDeleteClick(index)}
              ></button>
            )}
          </div>
        ))}
      <dialog
        ref={dialogRef}
        className="gallery__dialog"
        onClick={onOutsideClick}
      >
        <img src={image} alt="User bug image" />
      </dialog>
    </div>
  );
};

export default ImageGallery;
