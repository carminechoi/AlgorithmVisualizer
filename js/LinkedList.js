class Node {
    constructor(element)
    {
        this.element = element;
        this.next = null
    }
}

class LinkedList {
    constructor() 
    {
        this.head = null;
        this.size = 0;
    }

    // ADDS ELEMENT TO END OF THE LIST
    add(element) {
        var node = new Node(element)
        var current;
        // IF LIST IS EMPTY ADD ELEMENT AS HEAD
        if (this.head == null) {
            this.head = node
        } else {
            current = this.head;

            while (current.next) {
                current = current.next;
            }

            current.next = node;
        }
        this.size++;
    }

    // INSERT ELEMENT AT LOCATION
    insertAt(element, location) {
        if(index > 0 && index > this.size) {
            return false;
        } else {
            var node = new Node(element);
            var curr, prev;

            curr = this.head
            if (index == 0) {
                node.next = this.head;
                this.head = node;
            } else {
                curr = this.head;
                for (var i = 0; i < location; i++) {
                    prev = curr;
                    curr = curr.next;
                }
                
                node.next = curr;
                prev.next = node;
            }
            this.size++
        }
    }

    // REMOVE AT LOCATION
    

    // functions to be implemented
    // removeElement(element) 
  
    // Helper Methods 
    // isEmpty 
    // size_Of_List 
    // PrintList 
}