/** Funciones a testear --- Las pondremos aqui */
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const totalLikes = blogs.reduce((acc,blog) => acc + blog.likes,0);
    return totalLikes;
}

const favoriteBlog = ( blogs ) => {

    let blogMax = blogs[0]; // arranco suponiendo que el primer elemento es el que mas likes tiene

    for(let i = 1; i < blogs.lenght; i++) {
        const blog = blogs[i];

        if(blog.likes > blogMax) {
            // si esto se cumple, pasa a ser el mayor
            max = blog[i]
        }
    }

    return {
        title: blogMax.title,
        author: blogMax.author,
        likes: blogMax.likes
    };

}

const mostBlogs = (blogs) => {
    const conteo = {};

    // Contar cuántos blogs tiene cada autor
    for (let i = 0; i < blogs.length; i++) {
      const author = blogs[i].author;
      if (conteo[author]) {
        conteo[author]++;
      } else {
        conteo[author] = 1;
      }
    }
  
    //  Encontrar el autor con más blogs
    let autorMax = null;
    let maxBlogs = 0;
  
    for (const author in conteo) {
      if (conteo[author] > maxBlogs) {
        maxBlogs = conteo[author];
        autorMax = author;
      }
    }
  
    return { author: autorMax, blogs: maxBlogs };
}
const mostLikes = (blogs) => {

    const likesPorAutor = {};
  
    // Paso 1: Sumar los likes por autor
    for (let i = 0; i < blogs.length; i++) {
      const autor = blogs[i].author;
      const likes = blogs[i].likes;
  
      if (likesPorAutor[autor]) {
        likesPorAutor[autor] += likes;
      } else {
        likesPorAutor[autor] = likes;
      }
    }
  
    // Paso 2: Encontrar el autor con más likes
    let autorMax = null;
    let maxLikes = 0;
  
    for (const autor in likesPorAutor) {
      if (likesPorAutor[autor] > maxLikes) {
        maxLikes = likesPorAutor[autor];
        autorMax = autor;
      }
    }
  
    return { author: autorMax, likes: maxLikes };
  }

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}