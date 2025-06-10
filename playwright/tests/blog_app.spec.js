/** Haz una prueba para asegurarte de que la aplicación muestra el formulario de inicio de sesión por defecto. */
const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // vacía la base de datos aquí
    await request.post('http://localhost:3001/api/testing/reset'); // Post para vaciar los blogs y los usuarios de mi DB
    // crea un usuario para el backend aquí
    await request.post('http:localhost:3001/api/users', {
      data: {
        "username": "Gonza_77",
        "name": "Gonzalo",
        "password": "123456"
      }
    })


    // Abrir pagina del frontend luego de crear usuario 
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    /** Verifico que se muestren todos los componentes del login */
    await expect(page.getByTestId('username')).toBeVisible();
    await expect(page.getByTestId('password')).toBeVisible();
    await expect(page.getByTestId('button_login')).toBeVisible();
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      // Usuario creado anteriormente, credenciales validas
      await page.getByTestId('username').fill('Gonza_77')
      await page.getByTestId('password').fill('123456')
      await page.getByTestId('button_login').click(); // Click al boton de login

      // Verificar que este visible el h2 de usuario loggeado
      await expect(page.getByText('Gonza_77 logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      // Usuario que no existe, deberia tirar credenciales invalidas
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('wrong')
      await page.getByTestId('button_login').click(); // Click al boton de login

      const errorDiv = await page.locator('.error'); // Div que contiene el error
      await expect(errorDiv).toContainText('Wrong username or password');
      // Verificar que no este visible el h2 de usuario logged in
      await expect(page.getByText('mluukkai logged in')).not.toBeVisible()
    })
  });

  describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
      // Reset DB y crear usuario
      await request.post('http://localhost:3001/api/testing/reset');
      await request.post('http://localhost:3001/api/users', {
        data: {
          username: 'Gonza_77',
          name: 'Gonzalo',
          password: '123456',
        },
      });
      // Crear usuario A
      await request.post('http://localhost:3001/api/users', {
        data: {
          username: 'userA',
          name: 'User A',
          password: 'passwordA',
        },
      });

      // Crear usuario B
      await request.post('http://localhost:3001/api/users', {
        data: {
          username: 'userB',
          name: 'User B',
          password: 'passwordB',
        },
      });

      await page.goto('http://localhost:5173');

      // Login
      await page.getByTestId('username').fill('Gonza_77');
      await page.getByTestId('password').fill('123456');
      await page.getByTestId('button_login').click();

      // Crear un blog de prueba
      await page.getByTestId('toggle-blog-form').click();
      await page.getByTestId('title').fill('Primer blog');
      await page.getByTestId('author').fill('Autor');
      await page.getByTestId('url').fill('http://blog1.com');
      await page.getByTestId('create-blog').click();
    });

    test('5.20: a blog can be liked', async ({ page }) => {
      await page.getByTestId('view').click(); // Abre los detalles del blog

      const likeButton = page.getByTestId('like_button');
      const likesText = page.getByTestId('likes_text');

      // Verificar que empiece en 0
      await expect(likesText).toContainText('likes 0');

      // Hacer click en like
      await likeButton.click();

      // Verificar que aumente a 1
      await expect(likesText).toContainText('likes 1');
    });
    test('5.21: a blog can be deleted by its creator', async ({ page }) => {
      await page.getByTestId('view').click(); // Ver detalles del blog

      page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm');
        await dialog.accept(); // Aceptar confirmación
      });

      await page.getByTestId('delete_blog_button').click();

      // Asegurarse que el blog ya no está visible
      await expect(page.getByTestId('blog')).not.toBeVisible();
    });
    test('5.22: only the creator can see the delete button', async ({ page }) => {
       // Cerrar sesión
       await page.getByTestId('logout_button').click();
      // Login como usuario A y crear blog
      await page.goto('http://localhost:5173');
      // Login
      await page.getByTestId('username').fill('userA');
      await page.getByTestId('password').fill('passwordA');
      await page.getByTestId('button_login').click();

      // Crear un blog de prueba
      await page.getByTestId('toggle-blog-form').click();
      await page.getByTestId('title').fill('Blog by User A');
      await page.getByTestId('author').fill('Author A');
      await page.getByTestId('url').fill('https://example.com/a');
      await page.getByTestId('create-blog').click();

      // Cerrar sesión
      await page.getByTestId('logout_button').click();

      // Login como usuario B
      await page.getByTestId('username').fill('userB');
      await page.getByTestId('password').fill('passwordB');
      await page.getByTestId('button_login').click();

      // Ver detalles del blog
      await page.getByTestId('view').click();

      // Verificar que no aparece el botón de borrar
      await expect(page.getByTestId('delete_button')).toHaveCount(0);
    });

    test('5.23: blogs are ordered by number of likes', async ({ page }) => {
      // Crear 3 blogs
      const blogs = [
        { title: 'Primer blog', author: 'Autor 1', url: 'http://blog1.com', likes: 1 },
        { title: 'Segundo blog', author: 'Autor 2', url: 'http://blog2.com', likes: 5 },
        { title: 'Tercer blog', author: 'Autor 3', url: 'http://blog3.com', likes: 10 },
      ];
    
      for (const blog of blogs) {
        await page.getByTestId('toggle-blog-form').click();
        await page.getByTestId('title').fill(blog.title);
        await page.getByTestId('author').fill(blog.author);
        await page.getByTestId('url').fill(blog.url);
        await page.getByTestId('create-blog').click();
      }
    
      // Hacer click en todos los botones de "view"
      const viewButtons = await page.getByTestId('view').all();
      for (const button of viewButtons) {
        await button.click();
      }
    
      // Dar likes según lo definido
      const blogElements = await page.getByTestId('blog').all();
      for (const blogElement of blogElements) {
        const title = await blogElement.textContent();
    
        if (title.includes('Primer blog')) {
          const likeBtn = blogElement.getByTestId('like_button');
          await likeBtn.click();
        }
    
        if (title.includes('Segundo blog')) {
          const likeBtn = blogElement.getByTestId('like_button');
          for (let i = 0; i < 5; i++) {
            await likeBtn.click();
            await page.waitForTimeout(100);
          }
        }
    
        if (title.includes('Tercer blog')) {
          const likeBtn = blogElement.getByTestId('like_button');
          for (let i = 0; i < 10; i++) {
            await likeBtn.click();
            await page.waitForTimeout(100);
          }
        }
      }
    
      // Esperar a que se actualice el DOM
      await page.waitForTimeout(1000);
    
      // Obtener los blogs ordenados visualmente
      const orderedBlogs = await page.getByTestId('blog').allTextContents();
      expect(orderedBlogs).toHaveLength(3); // Verificar que haya 3 blogs
      // Verificar el orden
      expect(orderedBlogs[0]).toContain('Tercer blog');
      expect(orderedBlogs[1]).toContain('Segundo blog');
      expect(orderedBlogs[2]).toContain('Primer blog');
    });

  });
})