window.onload = () => {
    let $mindmap = $('.mindmap');
    let $nodeEditor = $('#nodeEditor') ;

    let MindMap = (() => {
        let selectedNode;
        let sortable;

        let originData = [
            {
                "nodeId": "root",
                "nodeName": "Food",
                "parentId": "",
                "prevId": "",
                "nextId": ""
            },
            {
                "nodeId": "b78931c7-a487-4003-b35b-0f9adbe108bc",
                "nodeName": "Plant",
                "parentId": "root",
                "prevId": "",
                "nextId": "212d8b43-1157-4306-8f2b-7563292e4f4f"
            },
            {
                "nodeId": "a211cea1-b9d2-44eb-ac1d-4f806d124747",
                "nodeName": "Fruits",
                "parentId": "b78931c7-a487-4003-b35b-0f9adbe108bc",
                "prevId": "",
                "nextId": "82f305e8-dc92-4db6-a10b-2fb347f5b91e"
            },
            {
                "nodeId": "848373fe-e3be-4164-bf23-a01e9a6feb9b",
                "nodeName": "Apples",
                "parentId": "a211cea1-b9d2-44eb-ac1d-4f806d124747",
                "prevId": "",
                "nextId": "8a9337a9-4c73-4dcf-bb0f-32151ebfbd15"
            },
            {
                "nodeId": "8a9337a9-4c73-4dcf-bb0f-32151ebfbd15",
                "nodeName": "Mangos",
                "parentId": "a211cea1-b9d2-44eb-ac1d-4f806d124747",
                "prevId": "848373fe-e3be-4164-bf23-a01e9a6feb9b",
                "nextId": "e26971dd-7d8f-402e-b626-9d291c8f1307"
            },
            {
                "nodeId": "e26971dd-7d8f-402e-b626-9d291c8f1307",
                "nodeName": "Oranges",
                "parentId": "a211cea1-b9d2-44eb-ac1d-4f806d124747",
                "prevId": "8a9337a9-4c73-4dcf-bb0f-32151ebfbd15",
                "nextId": "786d030d-8c3e-4616-969c-f6c5ed7100c3"
            },
            {
                "nodeId": "786d030d-8c3e-4616-969c-f6c5ed7100c3",
                "nodeName": "Mangos",
                "parentId": "a211cea1-b9d2-44eb-ac1d-4f806d124747",
                "prevId": "e26971dd-7d8f-402e-b626-9d291c8f1307",
                "nextId": "6d6a9f32-47b9-4b4d-a8a7-96e0fbd63e6f"
            },
            {
                "nodeId": "6d6a9f32-47b9-4b4d-a8a7-96e0fbd63e6f",
                "nodeName": "Oranges",
                "parentId": "a211cea1-b9d2-44eb-ac1d-4f806d124747",
                "prevId": "786d030d-8c3e-4616-969c-f6c5ed7100c3",
                "nextId": "4e832c76-97bc-468b-b09e-b673175ce773"
            },
            {
                "nodeId": "4e832c76-97bc-468b-b09e-b673175ce773",
                "nodeName": "Mangos",
                "parentId": "a211cea1-b9d2-44eb-ac1d-4f806d124747",
                "prevId": "6d6a9f32-47b9-4b4d-a8a7-96e0fbd63e6f",
                "nextId": "73985c32-3ee5-4fda-9636-bd3f50357c93"
            },
            {
                "nodeId": "73985c32-3ee5-4fda-9636-bd3f50357c93",
                "nodeName": "Oranges",
                "parentId": "a211cea1-b9d2-44eb-ac1d-4f806d124747",
                "prevId": "4e832c76-97bc-468b-b09e-b673175ce773",
                "nextId": "9ba9e5a9-211d-41b1-bdeb-e37ce5d9449f"
            },
            {
                "nodeId": "9ba9e5a9-211d-41b1-bdeb-e37ce5d9449f",
                "nodeName": "Mangos",
                "parentId": "a211cea1-b9d2-44eb-ac1d-4f806d124747",
                "prevId": "73985c32-3ee5-4fda-9636-bd3f50357c93",
                "nextId": "839da58d-fe22-4944-a16d-95a7513beee8"
            },
            {
                "nodeId": "839da58d-fe22-4944-a16d-95a7513beee8",
                "nodeName": "Oranges",
                "parentId": "a211cea1-b9d2-44eb-ac1d-4f806d124747",
                "prevId": "9ba9e5a9-211d-41b1-bdeb-e37ce5d9449f",
                "nextId": ""
            },
            {
                "nodeId": "82f305e8-dc92-4db6-a10b-2fb347f5b91e",
                "nodeName": "Vegetables",
                "parentId": "b78931c7-a487-4003-b35b-0f9adbe108bc",
                "prevId": "a211cea1-b9d2-44eb-ac1d-4f806d124747",
                "nextId": ""
            },
            {
                "nodeId": "4c730e2f-644a-4fd8-b643-3f710ce09111",
                "nodeName": "Tomatoes",
                "parentId": "82f305e8-dc92-4db6-a10b-2fb347f5b91e",
                "prevId": "",
                "nextId": "55f24c84-2ba6-483f-aada-f9bf257cfc96"
            },
            {
                "nodeId": "55f24c84-2ba6-483f-aada-f9bf257cfc96",
                "nodeName": "Potatoes",
                "parentId": "82f305e8-dc92-4db6-a10b-2fb347f5b91e",
                "prevId": "4c730e2f-644a-4fd8-b643-3f710ce09111",
                "nextId": "b5c89122-0263-4638-bde6-4c82391be97a"
            },
            {
                "nodeId": "b5c89122-0263-4638-bde6-4c82391be97a",
                "nodeName": "Cucumbers",
                "parentId": "82f305e8-dc92-4db6-a10b-2fb347f5b91e",
                "prevId": "55f24c84-2ba6-483f-aada-f9bf257cfc96",
                "nextId": ""
            },
            {
                "nodeId": "212d8b43-1157-4306-8f2b-7563292e4f4f",
                "nodeName": "Animal",
                "parentId": "root",
                "prevId": "b78931c7-a487-4003-b35b-0f9adbe108bc",
                "nextId": ""
            },
            {
                "nodeId": "d2d85828-d4b6-4506-b579-78d2b84c81e6",
                "nodeName": "Meat",
                "parentId": "212d8b43-1157-4306-8f2b-7563292e4f4f",
                "prevId": "",
                "nextId": "2729e92d-e6eb-48cf-9278-b5681132ffae"
            },
            {
                "nodeId": "2729e92d-e6eb-48cf-9278-b5681132ffae",
                "nodeName": "Milk",
                "parentId": "212d8b43-1157-4306-8f2b-7563292e4f4f",
                "prevId": "d2d85828-d4b6-4506-b579-78d2b84c81e6",
                "nextId": "f5bbfcb8-d431-456d-a200-c9ee88d8e870"
            },
            {
                "nodeId": "f5bbfcb8-d431-456d-a200-c9ee88d8e870",
                "nodeName": "Eggs",
                "parentId": "212d8b43-1157-4306-8f2b-7563292e4f4f",
                "prevId": "2729e92d-e6eb-48cf-9278-b5681132ffae",
                "nextId": ""
            }
        ]

        let nodes = [];
        // function getTree($node, parentId) {
        //     $node = $node || $mindmap.children('li');
        //     let nodeId = $node.attr('nodeId') || uuid();
            
        //     return {
        //         nodeId: nodeId,
        //         nodeName: $node.children('div.article').html(),
        //         parentId: parentId,
        //         prevId: $node.prev().length > 0 ? $node.prev().attr('nodeId') : '',
        //         nextId: $node.next().length > 0 ? $node.next().attr('nodeId') : '',
        //         children: $node.children('ul').children('li').toArray().map(child => getTree($(child), nodeId)),
        //     }
        // }

        function getNodes() {
            return $mindmap.find('li').toArray().map(li => {
                return getNodeBy$($('li'))
            })
        }
        function getNodeBy$($li) {
            return {
                nodeId: $li.children('div.article').attr('nodeId'),
                nodeName: $li.children('div.article').html(),
                parentId: $li.parent().parent('li').length > 0 ? $li.parent().parent('li').attr('nodeId') : '',
                prevId: $li.prev().length > 0 ? $li.prev().attr('nodeId') : '',
                nextId: $li.next().length > 0 ? $li.next().attr('nodeId') : '',
            }
        }
        function getDomNodeById(nodeId) {
            nodeId = nodeId || selectedNode;
            if(!nodeId) return;
            return $mindmap.find(`.article[nodeId="${nodeId}"]`)[0];
        }
        function get$NodeById(nodeId) {
            nodeId = nodeId || selectedNode;
            if(!nodeId) return;
            return $mindmap.find(`.article[nodeId="${nodeId}"]`);
        }

        function initTree(data) {
            let root = data.find(d => d.nodeId == 'root');
            let generateTree = (node) => {
                let tmp = data.filter(d => d.parentId == node.nodeId);
                let children = [];

                for(let i = 0; i < tmp.length; i++){
                    children.push(i==0 ? tmp.find(item => { return item.prevId == '' }) : tmp.find(item => { return item.prevId == children[i - 1].nodeId; }));
                }

                node.children = children;
                node.children.map(c => generateTree(c));
                return node;
            }
            $mindmap.html(generateNodeHtml(generateTree(root)));
        }
        function generateNodeHtml(node, force = false) {
            node = node || {};
            if(!force && !node.nodeId) return '';

            return `
            <li>
                <div class="article" nodeId="${ node.nodeId || '' }">${ node.nodeName || '' }</div>
                <ul>${ (node.children || []).map(child => generateNodeHtml(child) ).join('\n') }</ul>
            </li>`;
        }
        function selectNode($node) {
            selectedNode = $node.attr('nodeId');
        
            $mindmap.find('.article').css('background', 'unset');
            $node.css('background', 'bisque');
        }
        function focusNode(nodeId) {

        }
        function getNodeById(nodeId) {
            nodeId = nodeId || selectedNode;

        }
        function addChild(nodeId) {
            nodeId = nodeId || selectedNode;
            let newNodeId = uuid();
            get$NodeById(nodeId).siblings('ul').append(`
                <li>
                    <div class="article new-article" nodeId="${ newNodeId }">
                        <input value="" previosValue="">
                    </div>
                    <ul></ul>
                </li>`);
            sortable.addContainer('.mindmap ul');
            get$NodeById(newNodeId).children('input').focus();
        }
        function removeNode(nodeId) {
            nodeId = nodeId || selectedNode;
            get$NodeById(nodeId).parent().remove();
        }

        // init mindmap
        (() => {
            initTree(originData);
            nodes = getNodes();
            
            sortable = new Sortable.default(document.querySelectorAll('.mindmap ul'), {
                draggable: '.mindmap li',
                sortAnimation: {
                    duration: 200,
                    easingFunction: 'ease-in-out',
                },
                distance: 2,
                plugins: [ SortAnimation.default ],
                classes: {
                    'source:dragging': [ 'draggable-source--is-dragging', 'border', 'border-primary' ],
                    'source:placed': [ 'draggable-source--placed', 'animate__animated', 'animate__fadeInRight' ],
                    'mirror': [ 'draggable-mirror', 'opacity-3' ]
                }
            });
            sortable.on('drag:stop', () => nodes = getNodes() );
        })()

        return {
            // getTree,
            getNodes,
            selectNode,
            focusNode,
            getDomNodeById,
            get$NodeById,
            addChild,
            removeNode
        }
    })();
    
    $mindmap.on('click', '.article', nodeClickHandler);
    $mindmap.on('dblclick', '.article', nodeLeftDbclickHandler);
    $mindmap.on('contextmenu', '.article', nodeRightClickHandler);
    
    $mindmap.on('keyup', '.article input', inputLengthFitNodeHandler);
    $mindmap.on('focusout', '.article input', finishEditNodeNameHandler);
    $mindmap.on('mouseup', nodeFocusoutHandler);

    $mindmap.on('mouseup', '[action="editTitle"]', e => {
        let $node = MindMap.get$NodeById();
        if($node.find('input').length == 0) {
            let text = $node.html();
            $node.html(`<input value="${ text }" previosValue="${ text }">`);
            $node.find('input').trigger('keyup').focus();
        }
        removeToolbar('menu');
    })
    $mindmap.on('mouseup', '[action="editNode"]', e => {
        // let $node = MindMap.get$NodeById();
        e.preventDefault();
        $nodeEditor.toggleClass('active');
        // let selectorHtml = `<div class="pop-menu" style="top: ${ e.originalEvent.pageY - 10 }px; left: ${ e.originalEvent.pageX + 10 }px;">
        //     <form>
        //         <div class="form-group">
        //             <label>名稱</label>
        //             <input type="text" class="form-control">
        //             <small class="form-text text-muted"></small>
        //         </div>
        //         <div class="form-group">
        //             <label>答案包編號</label>
        //             <input type="text" class="form-control">
        //         </div>
        //         <div class="form-check">
        //             <input type="checkbox" class="form-check-input">
        //             <label class="form-check-label">回覆訊息</label>
        //         </div>
        //     </form>
        // </div>`
        // setTimeout(() => { $mindmap.append(selectorHtml); }, 100);
        // removeToolbar('menu');
    })
    $mindmap.on('mouseup', '[action="addChild"]', e => {
        // let $node = MindMap.get$NodeById();
        MindMap.addChild();
        removeToolbar('menu');
    })
    $mindmap.on('mouseup', '[action="removeNode"]', e => {
        // let $node = MindMap.get$NodeById();
        MindMap.removeNode();
        removeToolbar('menu');
    })

    function nodeClickHandler(e) {
        MindMap.selectNode($(e.currentTarget));
    }
    
    function nodeLeftDbclickHandler(e) {
        let $target = $(e.currentTarget);
        let $children = $target.parent().children('ul');
        if($children.children('li').length > 0) {
            if($children.hasClass('d-none')) {
                $children.removeClass('d-none animate__fadeOutLeft');
                $children.addClass('animate__animated animate__fadeInLeft');

            } else {
                $children.addClass('animate__animated animate__fadeOutLeft');
                setTimeout(() => {
                    $children.addClass('d-none');
                }, 500)
            }
            $target.toggleClass('folding animate__fadeInLeft');
        }

        MindMap.selectNode($target);
    }

    function nodeRightClickHandler(e) {
        e.preventDefault();
        let selectorHtml = `<div class="pop-menu" style="top: ${ e.originalEvent.pageY - 10 }px; left: ${ e.originalEvent.pageX + 10 }px;" toolbar="menu">
            <button type="button" action="editTitle" class="btn btn-sm btn-primary">
                <i class="fa fa-pen small mr-1"></i> 標題
            </button>
            <button type="button" action="editNode" class="btn btn-sm btn-primary">
                <i class="fa fa-pen small mr-1"></i> 內容
            </button>
            <button type="button" action="addChild" class="btn btn-sm btn-outline-primary">
                <i class="fa fa-plus small mr-1"></i> 新增
            </button>
            <button type="button" action="removeNode" class="btn btn-sm btn-outline-danger">
                <i class="fa fa-minus small mr-1"></i> 刪除
            </button>
        </div>`
        $mindmap.append(selectorHtml);

        MindMap.selectNode($(e.currentTarget));
    }

    // 調整input長度 不要太長
    function inputLengthFitNodeHandler(e) {
        e.currentTarget.style.width = (e.currentTarget.value.length + 2) + 'ch';
    }
    // 編輯完 focusout
    function finishEditNodeNameHandler(e) {
        let $target = $(e.currentTarget);
        let newValue;

        console.log(e)
        if($target.parent().hasClass('new-article') && $target.val() == '') {
            $target.closest('li').remove();
            return;
        } else if($target.val() == '') {
            newValue = $target.attr('previosValue');
        } else {
            newValue = $target.val();
        }
        $target.parent().removeClass('new-article');
        $target.parent().html(newValue);
    }

    function nodeFocusoutHandler(e) {
        // console.log(e)
        if(!$(e.target).hasClass('article') && !$(e.target).closest('.pop-menu').length > 0) {
            $mindmap.find('.article').css('background', 'unset');
            removeToolbar('menu');
        }
        
    }

    function removeToolbar(toolbar) {
        $mindmap.find(`[toolbar="${ toolbar }"]`).remove();
    }
}
function uuid() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
      d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }