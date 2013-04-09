/* 
Copyright Paul James Mutton, 2001-2004, http://www.jibble.org/

This file is part of PieSpy.

This software is dual-licensed, allowing you to choose between the GNU
General Public License (GPL) and the www.jibble.org Commercial License.
Since the GPL may be too restrictive for use in a proprietary application,
a commercial license is also provided. Full license information can be
found at http://www.jibble.org/licenses/

$Author: pjm2 $
$Id: Edge.java,v 1.6 2004/05/11 14:37:23 pjm2 Exp $

*/

package org.jibble.socnet;

public class Edge implements java.io.Serializable {
    
    public Edge(Node inSource, Node inTarget) {
        // Note that this graph is actually undirected.
        source = inSource;
        target = inTarget;
        weight = 0;
    }
    
    public void setWeight(double inWeight) {
        weight = inWeight;
    }
    
    public double getWeight() {
        return weight;
    }
    
    public Node getSource() {
        return source;
    }
    
    public Node getTarget() {
        return target;
    }
    
    public boolean equals(Object o) {
        if (o instanceof Edge) {
            Edge other = (Edge) o;
            return (source.equals(other.source) && target.equals(other.target)) || (source.equals(other.target) && target.equals(other.source));
        }
        return false;
    }
    
    public int hashCode() {
        return source.hashCode() + target.hashCode();
    }
    
    public String toString() {
        return source + " " + target + " w(" + weight + ")";
    }
    
    private Node source;
    private Node target;
    private double weight;
    
}