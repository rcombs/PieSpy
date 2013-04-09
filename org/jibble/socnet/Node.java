/* 
Copyright Paul James Mutton, 2001-2004, http://www.jibble.org/

This file is part of PieSpy.

This software is dual-licensed, allowing you to choose between the GNU
General Public License (GPL) and the www.jibble.org Commercial License.
Since the GPL may be too restrictive for use in a proprietary application,
a commercial license is also provided. Full license information can be
found at http://www.jibble.org/licenses/

$Author: pjm2 $
$Id: Node.java,v 1.9 2004/05/10 10:28:06 pjm2 Exp $

*/

package org.jibble.socnet;

public class Node implements java.io.Serializable {
    
    public Node(String nick) {
        setNick(nick);
        weight = 0;
        x = Math.random() * 2;
        y = Math.random() * 2;
        fx = 0;
        fy = 0;
    }
    
    public void setX(double ix) {
        x = ix;
    }
    
    public void setY(double iy) {
        y = iy;
    }

    public void setFX(double ifx) {
        fx = ifx;
    }
    
    public void setFY(double ify) {
        fy = ify;
    }
    
    public double getX() {
        return x;
    }
    
    public double getY() {
        return y;
    }
    
    public double getFX() {
        return fx;
    }
    
    public double getFY() {
        return fy;
    }
    
    public String toString() {
        return nick;
    }

    public void setWeight(double iweight) {
        weight = iweight;
    }

    public double getWeight() {
        return weight;
    }
    
    public boolean equals(Object o) {
        if (o instanceof Node) {
            Node other = (Node) o;
            return lowerCaseNick.equals(other.lowerCaseNick);
        }
        return false;
    }
    
    public int hashCode() {
        return lowerCaseNick.hashCode();
    }
    
    public void setNick(String inick) {
        nick = inick;
        lowerCaseNick = nick.toLowerCase();
    }
    
    private String nick;
    private String lowerCaseNick;
    private double weight;
    private double x;
    private double y;
    private double fx;
    private double fy;
    
}