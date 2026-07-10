<script>
  const blocks = document.querySelectorAll('.image-block');

  blocks.forEach(block => {
    block.querySelector('img').addEventListener('click', () => {
      
      blocks.forEach(b => {
        if (b !== block) b.classList.remove('active');
      });

      block.classList.toggle('active');
    });
  });
</script>