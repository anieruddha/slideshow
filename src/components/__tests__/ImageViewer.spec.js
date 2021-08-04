import ImageViewer from '../ImageViewer.svelte';
import { render, fireEvent, configure } from '@testing-library/svelte';

describe(ImageViewer.name, () => {
    it('component render properly', async () => {
        const {queryByRole, component} = render(ImageViewer,{
            src:'image-src',
            alt: 'image alt text'
        });
        const image = queryByRole('img');
        expect(image).toBeTruthy();
    });

    it('clicking on prev raise event', async () => {
        const mock = jest.fn();
        const {component, queryAllByRole } = render(ImageViewer,{
            src:'image-src',
            alt: 'image alt text',
            isPrev: true,
            isNext: false
        });
        component.$on('prev', () => mock());
        const element = queryAllByRole('link')[0];
        await fireEvent.click(element);
        expect(mock).toBeCalled();
    });

    it('clicking on next raise event', async () => {
        const mock = jest.fn();
        const {component, queryAllByRole} = render(ImageViewer,{
            src:'image-src',
            alt: 'image alt text',
            isPrev: false,
            isNext: true
        });
        component.$on('next', () => mock());
        const element = queryAllByRole('link')[1];
        await fireEvent.click(element);
        expect(mock).toBeCalled();
    });
});