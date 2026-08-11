// Face-mesh landmarks hand-placed to match the uploaded photo (460x460 crop space)
  (function(){
    const lineG = document.getElementById('face-mesh-lines');
    const ptG = document.getElementById('face-mesh-points');

    const P = {
      forehead_c:[231,55], forehead_l:[185,68], forehead_r:[277,68],
      temple_l:[150,95], temple_r:[312,95],
      brow_l_out:[150,100], brow_l_in:[205,92], brow_r_in:[257,92], brow_r_out:[313,100],
      eye_l_out:[150,115], eye_l_in:[205,113], eye_l_top:[177,105], eye_l_bot:[177,122],
      eye_r_in:[257,113], eye_r_out:[313,115], eye_r_top:[285,105], eye_r_bot:[285,122],
      nose_bridge:[231,110], nose_l:[215,168], nose_r:[248,168], nose_tip:[231,175],
      cheek_l:[140,150], cheek_r:[322,150],
      mouth_l:[198,200], mouth_r:[264,200], mouth_top:[231,193], mouth_bot:[231,210],
      jaw_l:[150,220], jaw_r:[313,220], chin:[231,250],
      jaw_l2:[170,255], jaw_r2:[293,255],
      ear_l:[120,140], ear_r:[343,140]
    };

    const EDGES = [
      ['forehead_c','forehead_l'],['forehead_c','forehead_r'],
      ['forehead_l','temple_l'],['forehead_r','temple_r'],
      ['temple_l','brow_l_out'],['temple_r','brow_r_out'],
      ['brow_l_out','brow_l_in'],['brow_r_in','brow_r_out'],
      ['brow_l_in','nose_bridge'],['brow_r_in','nose_bridge'],
      ['brow_l_out','eye_l_out'],['brow_r_out','eye_r_out'],
      ['eye_l_out','eye_l_top'],['eye_l_top','eye_l_in'],['eye_l_in','eye_l_bot'],['eye_l_bot','eye_l_out'],
      ['eye_r_in','eye_r_top'],['eye_r_top','eye_r_out'],['eye_r_out','eye_r_bot'],['eye_r_bot','eye_r_in'],
      ['eye_l_in','nose_bridge'],['eye_r_in','nose_bridge'],
      ['nose_bridge','nose_l'],['nose_bridge','nose_r'],
      ['nose_l','nose_tip'],['nose_r','nose_tip'],
      ['nose_l','mouth_l'],['nose_r','mouth_r'],
      ['mouth_l','mouth_top'],['mouth_top','mouth_r'],['mouth_r','mouth_bot'],['mouth_bot','mouth_l'],
      ['mouth_l','jaw_l'],['mouth_r','jaw_r'],
      ['jaw_l','jaw_l2'],['jaw_r','jaw_r2'],
      ['jaw_l2','chin'],['jaw_r2','chin'],['chin','mouth_bot'],
      ['cheek_l','eye_l_out'],['cheek_l','nose_l'],['cheek_l','jaw_l'],
      ['cheek_r','eye_r_out'],['cheek_r','nose_r'],['cheek_r','jaw_r'],
      ['temple_l','ear_l'],['temple_r','ear_r'],
      ['ear_l','cheek_l'],['ear_r','cheek_r'],
      ['ear_l','jaw_l'],['ear_r','jaw_r']
    ];

    EDGES.forEach(([a,b])=>{
      const [x1,y1] = P[a], [x2,y2] = P[b];
      const line = document.createElementNS("http://www.w3.org/2000/svg","line");
      line.setAttribute("x1",x1); line.setAttribute("y1",y1);
      line.setAttribute("x2",x2); line.setAttribute("y2",y2);
      lineG.appendChild(line);
    });

    Object.values(P).forEach(([x,y])=>{
      const c = document.createElementNS("http://www.w3.org/2000/svg","circle");
      c.setAttribute("cx",x); c.setAttribute("cy",y); c.setAttribute("r",2.4);
      ptG.appendChild(c);
    });
  })();

  // scroll-reveal for sections/cards
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.style.opacity = 1;
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, {threshold:0.12});

  document.querySelectorAll('.proj-card, .other-card, .stat-row, .tl-item, .flagship').forEach(el=>{
    el.style.opacity = 0;
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    io.observe(el);
  });

// face photo modal
(function(){
  const trigger = document.getElementById('faceTrigger');
  const modal = document.getElementById('faceModal');
  const closeBtn = document.getElementById('faceModalClose');
  if(!trigger || !modal) return;

  function openModal(){
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function closeModal(){
    modal.classList.remove('active');
    document.body.style.overflow = '';
    trigger.focus();
  }

  trigger.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{
    if(e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
})();
