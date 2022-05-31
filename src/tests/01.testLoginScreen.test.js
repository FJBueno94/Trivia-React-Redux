import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';
import object from './mockTrivia/API';

describe('Test the <Login.js /> pages', () => {
  it('Verifica se existe um input name e email', ()=> {
    renderWithRouter(<App />);
    const inputName = screen.getByLabelText(/nome:/i);
    const inputEmail = screen.getByLabelText(/email:/i);
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
  })
  it(`Verifica se existe um botão "Play" e se ele está desabilitado
  quando os inputs estiverem vazios`, () => {
    renderWithRouter(<App />);
    const buttonPlay = screen.getByRole('button', { name: /play/i });
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonPlay).toBeDisabled();
    const email = 'email@email.com';
    const inputEmail = screen.getByLabelText(/email:/i);
    userEvent.type(inputEmail, email);
    const inputName = screen.getByLabelText(/nome:/i);
    userEvent.type(inputName, 'F');
    expect(buttonPlay).toBeEnabled();
  })
  it('Verifica se ao clicar em "Play" a página é redirecionada para "/game"', () => {
    const { history } = renderWithRouter(<App />);
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(object),
    });
    const inputName = screen.getByLabelText(/nome:/i);
    userEvent.type(inputName, 'Eu');
    const email = 'email@email.com';
    const inputEmail = screen.getByLabelText(/email:/i);
    userEvent.type(inputEmail, email);
    
    const buttonPlay = screen.getByRole('button', { name: /play/i });
    expect(buttonPlay).toBeEnabled();

    userEvent.click(buttonPlay);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/game');
    global.fetch.mockRestore();

  })
  it(`Verifica se existe um botão "Settings" e se ele redireciona 
  para a pagina "/Settings"`, () => {
    const { history } = renderWithRouter(<App />);
    const buttonSettings = screen.getByRole('button', {  name: /settings/i})
    expect(buttonSettings).toBeInTheDocument();

    userEvent.click(buttonSettings);

    const { pathname } = history.location;

    expect(pathname).toBe('/settings'); 
  })
})