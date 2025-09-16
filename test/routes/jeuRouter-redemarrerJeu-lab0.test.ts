// Vous devez insérer les nouveaux tests ici
import { assert } from 'console';
import 'jest-extended';
import supertest from 'supertest';
import app from '../../src/app';

const request = supertest(app);
const testNom1 = 'Jean-Marc';
const testNom2 = 'Pierre';

beforeAll(async () => {
    await request.post('/api/v1/jeu/redemarrerJeu').send({ nom: testNom1 });
    await request.post('/api/v1/jeu/creerJoueur').send({ nom: testNom2 });
});

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  it(`devrait redémarrer le jeu avec succès ${testNom1}`, async () => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu');
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
  });

  it(`devrait ne plus rester de joueurs après redémarrage`, async () => {
        const response = await request.get('/api/v1/jeu/jouer' +testNom1);
        const response2 = await request.get('/api/v1/jeu/jouer' +testNom2);
        expect(response.status).toBe(404);
        expect(response2.status).toBe(404);
        
    });

});