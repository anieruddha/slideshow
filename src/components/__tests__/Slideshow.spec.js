import Slideshow from '../Slideshow.svelte';
import { render, fireEvent, configure } from '@testing-library/svelte';

describe(Slideshow.name, () => {
    it('component render properly', async () => {
        const mockScrollEvent = jest.fn();
        window.HTMLElement.prototype.scrollIntoView = mockScrollEvent;
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
        render(Slideshow,{
            imageList,
        });
        expect(mockScrollEvent).toBeCalled();
    });
});