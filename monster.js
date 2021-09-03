AFRAME.registerComponent('enemy-fire',{
    init:function(){
       setInterval(this.shootEnemyFireBall,3000)
    },
    shootEnemyFireBall:function(){
        var els = document.querySelectorAll('.enemy')
        for(var i = 0; i<els.length; i++){
            var enemyFireBall = document.createElement('a-entity')
            enemyFireBall.setAttribute('geometry',{
                primitive:'sphere',
                radius:0.15
            })
            enemyFireBall.setAttribute('material',{
                color:'red'
            })
            var position = els[i].getAttribute('position')
            enemyFireBall.setAttribute('position',{
                x:position.x+1.5,
                y:position.y+3,
                z:position.z
            })
            var scene = document.querySelector('#scene')
            scene.appendChild(enemyFireBall)

            var enemy = els[i].object3D
            var player = document.querySelector('#weapon').object3D
            var position1 = new THREE.Vector3()
            var position2 = new THREE.Vector3()

            player.getWorldPosition(position1)
            enemy.getWorldPosition(position2)

            var direction = new THREE.Vector3()
            direction.subVectors(position1,position2).normalize()

            enemyFireBall.setAttribute('velocity',direction.multiplyScalar(20))

            enemyFireBall.setAttribute('dynamic-body',{
                mass:0,
                shape:'sphere'
            })
            var el = document.querySelector('#livecount')
            var playerlive = parseInt(el.getAttribute('text').value)

            enemyFireBall.addEventListener('collide',function(e){
                if(e.detail.body.el.id === 'weapon'){
                    if(playerlive>0){
                        playerlive -=1
                        el.setAttribute('text',{
                            value:playerlive
                        })
                    }

                    if(playerlive<=0){
                        var text = document.querySelector('#gameover')
                        text.setAttribute('visible',true)
                        var tankel = document.querySelectorAll('.enemy')
                        for(var i = 0; i<tankel.length;i++){
                            scene.removeChild(tankel[i])
                        }
                    }
                }
            })
        }
    }
})