import { render, fireEvent, screen } from '@testing-library/react';
import ImageGallery from './ImageGallery';
import { describe, expect, it, vi } from 'vitest';

describe('Test image gallery', () => {
  const testImages = ['url1.jpg', 'url2.jpg', 'url3.jpg'];

  it('renders images correctly', () => {
    render(<ImageGallery images={testImages} editMode={false} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    images.forEach((image, index) =>
      expect(image).toHaveAttribute('src', testImages[index])
    );
  });

  it('opens a modal dialog on image click', () => {
    render(<ImageGallery images={testImages} editMode={false} />);
    window.HTMLDialogElement.prototype.showModal = vi.fn();
    fireEvent.click(screen.getAllByRole('img')[0]);
    expect(window.HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });

  it('closes the dialog when clicking outside of the image', () => {
    render(<ImageGallery images={testImages} editMode={false} />);
    fireEvent.click(screen.getAllByRole('img')[0]);
    fireEvent.mouseDown(document);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders delete buttons in edit mode', () => {
    const handleDelete = vi.fn();
    render(
      <ImageGallery
        images={testImages}
        editMode={true}
        onDeleteClick={handleDelete}
      />
    );
    const deleteButtons = screen.getAllByRole('button');
    expect(deleteButtons).toHaveLength(3);
    fireEvent.click(deleteButtons[0]);
    expect(handleDelete).toHaveBeenCalledWith(0);
  });

  it('does not render delete buttons when not in edit mode', () => {
    render(<ImageGallery images={testImages} editMode={false} />);
    expect(screen.queryByRole('button')).toBeNull();
  });
});
