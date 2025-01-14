import Home from "@/components/home"
import {render, screen} from "@testing-library/react";


describe('Home', () => {
    let header: HTMLElement;

    beforeEach(() => {
        render(<Home/>);
        header = screen.getByRole('heading', {level: 1});
    });

    it('Should render home title', () => {
        expect(header).toBeInTheDocument()
    });

    it('Should be an h1 header', () => {
        expect(header).toBeInTheDocument();
        expect(header.tagName).toBe('H1');
    });

    it('Should contain the correct text', () => {
        expect(header.textContent).toBe('Welcome the the home page');
    });

})