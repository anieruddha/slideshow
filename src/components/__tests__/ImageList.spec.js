import ImageList from '../ImageList.svelte';
import { render, fireEvent } from '@testing-library/svelte';

describe(ImageList.name, () => {
    it('component render empty when no images', async () => {
        const {queryAllByRole} = render(ImageList);
        const images = queryAllByRole('img');

        expect(images.length).toBe(0);
    });

    it('component render images', async () => {
        const imageList = [
            {
                id: 1,
                thumbnail: 'thumbnail-url-1',
                text: 'thumbnail1',
                src: 'original-image-url-1',
                tags: ['tag1','tag2']
            },
            {
                id: 2,
                thumbnail: 'thumbnail-url-2',
                text: 'thumbnail2',
                src: 'original-image-url-2',
                tags: ['tag1','tag2']
            }
        ];
        const currentImageId = 1;
        const {queryAllByRole} = render(ImageList, {
            imageList,
            currentImageId
        });
        const images = queryAllByRole('img');
        const currentImage = images.find((ele) => ele.id == currentImageId);

        expect(images.length).toBe(imageList.length);
        expect(currentImage).toBeTruthy();
    });

    it('clicking on image dispatch click event', async () => {
        const imageList = [
            {
                id: 1,
                thumbnail: 'thumbnail-url-1',
                text: 'thumbnail1',
                src: 'original-image-url-1',
                tags: ['tag1','tag2']
            },
            {
                id: 2,
                thumbnail: 'thumbnail-url-2',
                text: 'thumbnail2',
                src: 'original-image-url-2',
                tags: ['tag1','tag2']
            }
        ];
        const currentImageId = 1;
        const {queryAllByRole, component} = render(ImageList, {
            imageList,
            currentImageId
        });
        const mock = jest.fn();
        const images = queryAllByRole('img');
        const nonCurrentImage = images.find((ele) => ele.id != currentImageId);

        component.$on('click', mock);
        await fireEvent.click(nonCurrentImage);

        expect(images.length).toBe(imageList.length);
        expect(mock).toHaveBeenCalled();
    });
});